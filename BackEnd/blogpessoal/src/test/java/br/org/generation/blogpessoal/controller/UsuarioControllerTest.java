package br.org.generation.blogpessoal.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import br.org.generation.blogpessoal.model.Usuario;
import br.org.generation.blogpessoal.repository.UsuarioRepository;
import br.org.generation.blogpessoal.service.UsuarioService;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UsuarioControllerTest {
	
	@Autowired
	private TestRestTemplate testRestTemplate;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private UsuarioRepository usuariorepository;
	
	@Test
	@Order(1)
	@DisplayName("Cadastrar Usuário")
	public void deveCriarUmUsuario() {
		
		// Criando a Requisição
		HttpEntity<Usuario> requisicao = new HttpEntity<Usuario>(new Usuario(0L,
				"Paulo Antunes", "paulo_antunes@email.com.br", "13465278", " "));
		
		// Enviando a Requisição e Recebendo uma Resposta
		ResponseEntity<Usuario> resposta = testRestTemplate.exchange("/usuarios/cadastrar", HttpMethod.POST,
				requisicao, Usuario.class);
		
		// Checando se a Resposta foi a Resposta esperada
		assertEquals(HttpStatus.CREATED, resposta.getStatusCode());
		
		// Checa se o Nome do Usuário que foi enviado foi gravado no banco de dados
		assertEquals(requisicao.getBody().getNome(), resposta.getBody().getNome());
	}
	
	@Test
	@Order(2)
	@DisplayName("Não deve permitir a duplicação do Usuário")
	public void naoDeveDuplicarUsuario() {
		
		usuarioService.cadastrarUsuario(new Usuario(0L,
				"Maria da Silva", "maria_silva@email.com.br", "13465278", " "));
		
		// Criando a Requisição
		HttpEntity<Usuario> requisicao = new HttpEntity<Usuario>(new Usuario(0L,
				"Maria da Silva", "maria_silva@email.com.br", "13465278", " "));
		
		// Enviando a Requisição e Recebendo uma Resposta
		ResponseEntity<Usuario> resposta = testRestTemplate.exchange("/usuarios/cadastrar", HttpMethod.POST,
				requisicao, Usuario.class);
		
		// Checando se a Resposta foi a Resposta esperada
		assertEquals(HttpStatus.BAD_REQUEST, resposta.getStatusCode());	
	}
	
	@Test
	@Order(3)
	@DisplayName("Atualizar Usuário")
	public void deveAtualizarUmUsuario() {
		
		Optional<Usuario> usuarioCreate = usuarioService.cadastrarUsuario(new Usuario(0L,
				"Juliana Andrews", "juliana_andrews@email.com.br", "juliana123", " "));
		
		Usuario usuarioUpdate = new Usuario(usuarioCreate.get().getId(),
				"Juliana Andrews Ramos", "juliana_ramos@email.com.br", "juliana123", " ");
				
		// Criando a Requisição
		HttpEntity<Usuario> requisicao = new HttpEntity<Usuario>(usuarioUpdate);
		
		// Enviando a Requisição e Recebendo uma Resposta com autenticação
		ResponseEntity<Usuario> resposta = testRestTemplate
				.withBasicAuth("root", "root")
				.exchange("/usuarios/atualizar", HttpMethod.PUT,requisicao, Usuario.class);
		
		// Checando se a Resposta foi a Resposta esperada
		assertEquals(HttpStatus.OK, resposta.getStatusCode());
		
		// Checa se o Nome do Usuário que foi enviado foi gravado no banco de dados
		assertEquals(requisicao.getBody().getNome(), resposta.getBody().getNome());
	}
	
	@Test
	@Order(4)
	@DisplayName("Listar todos os Usuário")
	public void deveListarTodosOsUsuario() {
		
		usuarioService.cadastrarUsuario(new Usuario(0L,
				"Sabrina Sanches", "sabrina_sanches@email.com.br", "sabrina123", " "));
		
		usuarioService.cadastrarUsuario(new Usuario(0L,
				"Ricardo Marques", "ricardo_marques@email.com.br", "ricardo123", " "));
				
		
		// Enviando a Requisição e Recebendo uma Resposta com autenticação
		ResponseEntity<String> resposta = testRestTemplate
				.withBasicAuth("root", "root")
				.exchange("/usuarios/all", HttpMethod.GET, null, String.class);
		
		// Checando se a Resposta foi a Resposta esperada
		assertEquals(HttpStatus.OK, resposta.getStatusCode());
		
	}
	
	/*
	@Test
    public void buscarAvaliacaoPorIdTest() {
        Avaliacao avaliacaoSalva = this.repository.save(this.avaliacao);

        ResponseEntity<AvaliacaoDto> response = this.testRestTemplate
            .exchange("/avaliacao/" + avaliacaoSalva.getId(), HttpMethod.GET, null, AvaliacaoDto.class);
    
        assertEquals(response.getStatusCode(), HttpStatus.OK);
        assertEquals(response.getBody().getNota(), 8);
    }
	*/
	
	@Test
	@Order(5)
	@DisplayName("Buscar usuário por ID")
	public void buscarUsuariosPorId() {
		
		Usuario usuario = usuariorepository.save(new Usuario(0L,
				"Ricardo Marques", "ricardo_marques@email.com.br", "ricardo123", " "));
	
		ResponseEntity<String> resposta = testRestTemplate
			.withBasicAuth("root", "root")
			.exchange("/usuarios/"+usuario.getId(), HttpMethod.GET, null, String.class);

		assertEquals(HttpStatus.OK, resposta.getStatusCode());
	}
	
}
