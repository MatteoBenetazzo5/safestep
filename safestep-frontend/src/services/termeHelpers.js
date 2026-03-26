export const getRatingValue = (terma) => {
  if (!terma) return 0

  return Number(
    terma.ratingMedio ||
      terma.mediaVoti ||
      terma.mediaRecensioni ||
      terma.votoMedio ||
      terma.rating ||
      0,
  )
}

export const hasAccessibilityInfo = (terma) => {
  if (!terma) return false

  if (terma.accessibile === true) return true
  if (terma.accessibilitaStruttura === true) return true
  if (terma.rampe === true) return true
  if (terma.parcheggioDisabili === true) return true
  if (terma.bagnoAccessibile === true) return true

  if (
    Array.isArray(terma.caratteristicheAccessibilita) &&
    terma.caratteristicheAccessibilita.length > 0
  ) {
    return true
  }

  if (Array.isArray(terma.accessibilita) && terma.accessibilita.length > 0) {
    return true
  }

  const noteDisabili = terma.noteDisabili?.trim() || ""
  const accessibilitaNote = terma.accessibilitaNote?.trim() || ""

  return Boolean(noteDisabili || accessibilitaNote)
}

export const hasCoordinates = (terma) => {
  if (!terma) return false

  const latitudine = Number(terma.latitudine)
  const longitudine = Number(terma.longitudine)

  return !Number.isNaN(latitudine) && !Number.isNaN(longitudine)
}

const toRadians = (value) => (value * Math.PI) / 180

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371
  const deltaLat = toRadians(lat2 - lat1)
  const deltaLon = toRadians(lon2 - lon1)

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadius * c
}

export const getDistanceFromUser = (terma, posizioneUtente) => {
  if (!posizioneUtente || !terma) return Number.POSITIVE_INFINITY

  const latitudineStruttura = Number(terma.latitudine)
  const longitudineStruttura = Number(terma.longitudine)

  if (
    Number.isNaN(latitudineStruttura) ||
    Number.isNaN(longitudineStruttura)
  ) {
    return Number.POSITIVE_INFINITY
  }

  return calculateDistance(
    posizioneUtente.latitude,
    posizioneUtente.longitude,
    latitudineStruttura,
    longitudineStruttura,
  )
}