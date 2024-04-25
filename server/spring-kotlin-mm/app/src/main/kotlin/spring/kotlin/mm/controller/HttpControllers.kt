package spring.kotlin.mm.controller

import io.swagger.annotations.Api
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.http.HttpStatus.*
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import spring.kotlin.mm.entity.Article
import spring.kotlin.mm.entity.ArticleRepository
import spring.kotlin.mm.entity.UserRepository

@Api(value = "ArticleController", description = "REST API for Articles", tags = ["Article"])
@RestController
@RequestMapping("/api/article")
class ArticleController(private val repository: ArticleRepository) {


	@GetMapping("")
	fun findAll() = repository.findAllByOrderByAddedAtDesc().toList()

	@GetMapping("/{slug}")
	fun findOne(@PathVariable slug: String) =
			repository.findBySlug(slug) ?: throw ResponseStatusException(NOT_FOUND, "This article does not exist")

}

@RestController
@RequestMapping("/api/user")
class UserController(private val repository: UserRepository) {

	@GetMapping("/")
	fun findAll() = repository.findAll().toList()

	@GetMapping("/{login}")
	fun findOne(@PathVariable login: String) = repository.findByLogin(login) ?: throw ResponseStatusException(NOT_FOUND, "This user does not exist")
}
