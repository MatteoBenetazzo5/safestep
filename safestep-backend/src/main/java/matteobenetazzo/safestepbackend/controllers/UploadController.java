package matteobenetazzo.safestepbackend.controllers;

import matteobenetazzo.safestepbackend.services.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/upload")
public class UploadController {

    @Autowired
    private UploadService uploadService;

    @PostMapping("/image")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> uploadImage(@RequestParam("file") MultipartFile file) {

        String url = uploadService.uploadImage(file);

        return Map.of("url", url);
    }
}
