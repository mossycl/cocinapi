import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { AppModule } from "src/app.module"
import { DbService } from "src/db/db.service";
import * as pactum from "pactum";
import { AuthDto, LoginDto } from "src/auth/dto";
import { EditUserDto } from "src/user/dto";

describe('App e2e', () => {
  let app : INestApplication;
  let dbService : DbService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
    }))
    await app.init();
    await app.listen(3000);

    dbService = app.get(DbService)
    await dbService.cleanDb();

    pactum.request.setBaseUrl('http://localhost:3000');
  })
  afterAll(() => {
    app.close();
  })
  it.todo('should pass')

  describe('Auth', () => {
    describe('Signup', () => {
      it('should signup', () => {
        const dto : AuthDto = {
          email : 'example@example.com',
          password : 'password',
          firstName : "Pablo",
          lastName : "Troncoso"
        }
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody(dto)
        .expectStatus(201)
      });
    });
    describe('Signin', () => {
      it('should signin', () => {
        const dto : LoginDto = {
          email : 'example@example.com',
          password : 'password'
        }

        return pactum
        .spec()
        .post('/auth/signin')
        .withBody(dto)
        .expectStatus(200)
        .stores('userAt','access_token');
      })
    });
  })

  describe('User', () => {
    describe('Get User', () => {
      it('should get the current user', () => {
        return pactum
        .spec()
        .get('/users/me')
        .withHeaders({
          Authorization : 'Bearer $S{userAt}'
        })
        .expectStatus(200)
      })
    });
    describe('Edit User', () => {
      it('should edit info from the user', () => {
        const dto : EditUserDto = {
          lastName : 'Pedro'
        }
        return pactum
        .spec()
        .patch('/users/edit')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .withBody(dto)
        .expectStatus(200)
        .inspect()
      })
    })
  })

  describe('Recipe', () => {
    describe('Show Recipes', () => {
      it('should show an empty array', () => {
        return pactum
        .spec()
        .get('/recipes')
        .withHeaders({
          Authorization : 'Bearer $S{userAt}'
        })
        .expectStatus(200)
      })
    })
    describe('Add Recipe', () => {

    })
    describe('Edit recipe', () => {

    })
    describe('Delete recipe', () => {

    })
    describe('Search recipe by name', () => {

    })
  })
})
