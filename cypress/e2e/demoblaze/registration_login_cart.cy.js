describe('Demoblaze Registration, Login, and Add to Cart Test', () => {
  const username = `user_${Math.floor(Math.random() * 10000)}`;
  const password = `password_${Math.floor(Math.random() * 10000)}`;

  it('should register a new user', () => {
    cy.visit('https://www.demoblaze.com/');

    cy.get('#signin2').click();
    cy.wait(3000); 

    cy.get('#sign-username').should('be.visible').type(username);
    cy.get('#sign-password').should('be.visible').type(password);
    cy.get('.btn.btn-primary').contains('Sign up').click();

    cy.wait(5000); 

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.include('Sign up successful');
    });

    cy.reload();
  });

  it('should login with the newly registered user', () => {
    cy.visit('https://www.demoblaze.com/');

    cy.get('#login2').click();
    cy.wait(3000); 

    cy.get('#loginusername').should('be.visible').type(username);
    cy.get('#loginpassword').should('be.visible').type(password);
    cy.get('.btn-primary').contains('Log in').click();

    cy.wait(7000); 

    
    cy.get('#nameofuser').should('be.visible').and('contain', `Welcome ${username}`);
  });

  it('should add Samsung Galaxy s6 to the cart', () => {
    cy.visit('https://www.demoblaze.com/');
    cy.contains('Samsung galaxy s6', { timeout: 15000 }).should('be.visible').click();

    cy.url().should('include', 'prod.html?idp_');
    cy.contains('Add to cart').should('be.visible').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Product added.');
    });

    cy.get('#cartur').click();
    cy.contains('Samsung galaxy s6').should('be.visible');
  });
});