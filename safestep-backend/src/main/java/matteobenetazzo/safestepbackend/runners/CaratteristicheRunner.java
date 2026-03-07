package matteobenetazzo.safestepbackend.runners;

import matteobenetazzo.safestepbackend.entities.Caratteristica;
import matteobenetazzo.safestepbackend.repositories.CaratteristicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CaratteristicheRunner implements CommandLineRunner {

    @Autowired
    private CaratteristicaRepository caratteristicaRepository;

    @Override
    public void run(String... args) throws Exception {
        salvaSeNonEsiste("RAMPA", "Presenza rampa");
        salvaSeNonEsiste("ASCENSORE", "Ascensore accessibile");
        salvaSeNonEsiste("BAGNO_ACCESSIBILE", "Bagno accessibile");
        salvaSeNonEsiste("PARCHEGGIO_DISABILI", "Parcheggio disabili");
        salvaSeNonEsiste("INGRESSO_LIVELLO_STRADA", "Ingresso a livello strada");
        salvaSeNonEsiste("PORTE_AMPIE", "Porte ampie");
        salvaSeNonEsiste("TAVOLI_ACCESSIBILI", "Tavoli accessibili");
        salvaSeNonEsiste("SEGNALAZIONE_BRAILLE", "Segnalazione braille");
    }

    private void salvaSeNonEsiste(String codice, String etichetta) {
        boolean esisteGia = this.caratteristicaRepository.existsByCodice(codice);

        if (!esisteGia) {
            Caratteristica nuovaCaratteristica = new Caratteristica(codice, etichetta);
            this.caratteristicaRepository.save(nuovaCaratteristica);
            System.out.println("Caratteristica creata: " + codice);
        } else {
            System.out.println("Caratteristica gia presente: " + codice);
        }
    }
}
