package spring.kotlin.mm.config

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SwaggerConfig {
    @Bean
    fun openAPI(): OpenAPI {
        return OpenAPI()
            .info(Info().title("제품 API")
                .description("제품 관리를 위한 API 문서")
                .version("v0.0.1"))
    }
}
