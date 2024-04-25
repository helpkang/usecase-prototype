package spring.kotlin.mm.config

import io.swagger.models.Path
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import springfox.documentation.builders.PathSelectors
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket
import springfox.documentation.swagger2.annotations.EnableSwagger2
import java.util.function.Predicate
import kotlin.io.path.Path

@Configuration
//@EnableSwagger2
class SwaggerConfig {
    @Bean
    fun api(): Docket {
        return Docket(DocumentationType.SWAGGER_2)
            .select()
//            .apis(RequestHandlerSelectors.any())
            .paths(PathSelectors.ant("/api/**"))
            .apis(RequestHandlerSelectors.basePackage("spring.kotlin.mm.controller"))
//            .paths(Predicate.not(PathSelectors.regex("/profile*")))
            .paths(PathSelectors.any())

            .build()
    }
}