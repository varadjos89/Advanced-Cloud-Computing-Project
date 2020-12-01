package edu.northeastern.ccwebapp.controller;

import edu.northeastern.ccwebapp.pojo.Book;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
public class BookController {

    //@Value("${backendUrl}")
    private String baseUrl= "http://backend2db:8081";

    private final RestTemplate restTemplate;

    public BookController(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @PostMapping(value = "/book", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> createBook(@RequestBody Book book, HttpServletRequest request) throws URISyntaxException {
        URI uri = new URI(baseUrl + "/book");

        return restTemplate.postForEntity(uri, book, String.class);
    }

    @GetMapping(value = "/book", produces = "application/json")
    public ResponseEntity<?> returnBookDetails(HttpServletRequest request) throws URISyntaxException {
        String url = baseUrl + "/book";
        URI uri = new URI(url);
        return restTemplate.getForEntity(uri, String.class);
    }

    @GetMapping(value = "/book/{id}", produces = "application/json")
    public ResponseEntity<?> getBookById(@PathVariable String id, HttpServletRequest request) throws URISyntaxException {
        URI uri = new URI(baseUrl + "/book/" + id);
        return restTemplate.getForEntity(uri, String.class);
    }

    @DeleteMapping(value = "/book/{id}")
    public ResponseEntity<?> deleteBookById(@PathVariable("id") String id, HttpServletRequest request) throws URISyntaxException {
        URI uri = new URI(baseUrl + "/book/" + id);
        restTemplate.delete(uri);
        return new ResponseEntity(HttpStatus.OK);
    }
}
