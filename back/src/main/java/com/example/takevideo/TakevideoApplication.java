package com.example.takevideo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@SpringBootConfiguration
class MyWebMvcConfig extends WebMvcConfigurationSupport {

    // this main mothod，Just add this method
    @Override
    protected void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("http://localhost:8080").allowCredentials(true).allowedMethods("GET","POST","PUT","DELETE");
        registry.addMapping("/**").allowedOrigins("http://localhost:4200").allowCredentials(true).allowedMethods("GET","POST","PUT","DELETE");
        super.addCorsMappings(registry);
    }
}

@SpringBootApplication
public class TakevideoApplication {

    public static void main(String[] args) {
        SpringApplication.run(TakevideoApplication.class, args);
    }

}
