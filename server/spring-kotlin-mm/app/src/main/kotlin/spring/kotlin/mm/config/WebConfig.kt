package spring.kotlin.mm.config

import org.springframework.context.annotation.Configuration
import org.springframework.hateoas.config.EnableHypermediaSupport
import org.springframework.hateoas.config.EnableHypermediaSupport.HypermediaType
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
@EnableWebMvc
class WebConfig : WebMvcConfigurer {
//    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
//        registry.addResourceHandler("/swagger-ui.html**")
//            .addResourceLocations("classpath:/META-INF/resources/swagger-ui.html")
//        registry.addResourceHandler("/webjars/**")
//            .addResourceLocations("classpath:/META-INF/resources/webjars/")
//        // -- Static resources
//        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
//        registry.addResourceHandler("/css/**").addResourceLocations("classpath:/static/css");
//        registry.addResourceHandler("/js/**").addResourceLocations("classpath:/static/js/");
//        registry.addResourceHandler("/images/**").addResourceLocations("classpath:/static/images/");
//    }
}