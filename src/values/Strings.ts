
export interface LanguageType{
    sample:string;
    id:string;
    email:string;
    password:string;
    enter:string;
    forgotPassword:string;
    activateAccount:string;
    login:string;
    activationCode:string;
    activate:string;
    defineYourPassword:string;
    aboutDefiningPassword:string;
    newPassword:string;
    continue:string;
    errorOnLogin:string;
    enterRef:string;
    reference:string;
}
export default {
    pt:{
        id:'id',
        email:'email',
        password:'senha',
        enter:'Entrar',
        forgotPassword:'Esqueci a Senha',
        activateAccount:'Ativar conta',
        login:'Fazer login',
        activationCode:'Código de Ativação',
        activate:'Ativar',
        defineYourPassword:'Define a sua Senha',
        aboutDefiningPassword:'A senha sera usada para iniciar futuras sessões \n& provar a credibilidade.',
        newPassword:'Nova Senha',
        continue:'continuar',
        errorOnLogin:"Erro no Login",
        enterRef:"Insira Id",
        reference:"Referencia",
        sample:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea"
    } as LanguageType,
    en:{

    }
}