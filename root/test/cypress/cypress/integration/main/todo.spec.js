describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000/')
  })

  it('check navbar', () => {
    cy.contains("Socialscope")
    cy.contains("Home")
    cy.contains("Search")
    cy.contains("History")
    cy.contains("FAQ")
  })
  it('check Home page', () => {
    cy.contains("Home").click()
    cy.contains("Head Title")
    cy.contains("Subheading tagline that is a bit longer")
    cy.contains("Start Here").click()
  })

  it('check Search page', () => {
    cy.contains("Search").click()
    cy.get('input[name=query]').should('have.value', '');
    cy.get('input[name=startDate]').should('have.value', '');
    cy.get('input[name=endDate]').should('have.value', '');
    cy.get('input[name=maxResults]').should('have.value', '');
    cy.get('input[name=twitter]').should('have.value', 'false')
    cy.get('input[name=youtube]').should('have.value', 'false')
    cy.get('input[name=reddit]').should('have.value', 'false')
    cy.contains("Launch Search").should('not.be.disabled')
    cy.contains("Reset Filter").should('not.be.disabled')
    cy.contains("Cancel").should('not.be.disabled')
  })

  it('check History page', () => {
    cy.contains("History").click()
    cy.contains("history page")
  })

  it('check FAQ page', () => {
    cy.contains("FAQ").click()
    cy.contains("faq page")
  })
})