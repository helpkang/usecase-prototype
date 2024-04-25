package spring.kotlin.mm.entity

import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.stereotype.Repository
@RestResource(exported = false)
interface ArticleRepository : CrudRepository<Article, Long> {
	fun findBySlug(slug: String): Article?
	fun findAllByOrderByAddedAtDesc(): Iterable<Article>
}


@RestResource(exported = true)
interface UserRepository : CrudRepository<User, Long> {
	fun findByLogin(login: String): User?
}

