import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {
    beforeEach('Начало теста', function () {
        cy.visit('/'); //Зашла на сайт 
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); //Проверяю цвет кнопки восстановить пароль
    });
    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); //Есть крестик и он виден для пользователя 
       });
    it('Верный логин и верный пароль', function () {  
         cy.get(main_page.email).type(data.login); //Ввела верный логин
         cy.get(main_page.password).type(data.password); //Ввела верный пароль
         cy.get(main_page.login_button).click(''); //Нажала войти
         cy.get(result_page.title).contains('Авторизация прошла успешно'); //Проверяю, что после авторизации, вижу текст
         cy.get(result_page.title).should('be.visible'); //Текст виден для пользователя     
     })
     it('Верный логин и неверный пароль', function () {  
        cy.get(main_page.email).type(data.login); //Ввела верный логин
        cy.get(main_page.password).type('iLoveqastudio2'); //Ввела неверный пароль
        cy.get(main_page.login_button).click(''); //Нажала войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); //Проверяю, что после авторизации, вижу текст
        cy.get(result_page.title).should('be.visible'); //Текст виден для пользователя   
    })
    it('Проверка, что в логине есть@', function () {  
        cy.get(main_page.email).type('germandolnikov.ru'); //Ввела логин без @
        cy.get(main_page.password).type(data.password); //Ввела верный пароль
        cy.get(main_page.login_button).click(''); //Нажала войти 
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); //Проверяю, что после авторизации, вижу текст
        cy.get(result_page.title).should('be.visible'); //Текст виден для пользователя    
    })
    it('Неверный логин и верный пароль', function () {    
        cy.get(main_page.email).type('evgeniia@dolnikov.ru'); //Ввела неверный логин
        cy.get(main_page.password).type(data.password); //Ввела верный пароль
        cy.get(main_page.login_button).click(''); //Нажала войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); //Проверяю, что после авторизации, вижу текст
        cy.get(result_page.title).should('be.visible'); //Текст виден для пользователя   
    })
    it('Проверка восстановления пароля', function () {   
        cy.get(main_page.fogot_pass_btn).click(''); //Восстановить пароль
        cy.get(recovery_page.email).type(data.login); //Ввела верный логин
        cy.get(recovery_page.send_button).click(''); //Нажала отправить код  
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); //Проверяю, что после авторизации, вижу текст
        cy.get(result_page.title).should('be.visible'); //Текст виден для пользователя    
  })
  it('Верный логин с загловными и строчными символами и верный пароль', function () { 
    cy.get(main_page.email).type('GerMan@Dolnikov.ru'); //Ввела верный логин
    cy.get(main_page.password).type(data.password); //Ввела верный пароль
    cy.get(main_page.login_button).click(''); //Нажала войти
    cy.get(result_page.title).contains('Авторизация прошла успешно'); //Проверяю, что после авторизации, вижу текст
    cy.get(result_page.title).should('be.visible'); //Текст виден для пользователя   
}) 
})



//План
//Найти поле логин ввести правильный логин
//Найти поле пароль и ввести правильный пароль
//Найти кнопку Войти и нажать на нее
//Проверить, что авторизация прошла успешно