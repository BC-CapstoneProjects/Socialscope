describe('Socialscope cypress tech demo', () => {
    // home page
    it('displays home page correctly', () => {
        cy.visit('/')
        cy.get('h1').contains('Welcome')
        cy.get('svg').should('be.visible')
    })
    it('has working navigations', () => {
        cy.visit('/')
        cy.get('button')
            .contains('Start Here')
            .click()
        cy.get('h2').contains('Search')
        cy.get('a').contains('Home').click()
        cy.get('h1').contains('Welcome')
        cy.get('a').contains('Search').click()
        cy.location('pathname', {timeout: 1000})
            .should('include', 'search')
        cy.get('h2').contains('Search')
        cy.get('a').contains('History').click()
        cy.location('pathname', {timeout: 1000})
            .should('include', 'history')
        cy.get('a').contains('FAQ').click()
        cy.location('pathname', {timeout: 1000})
            .should('include', 'faq')
        cy.get('a').contains('Home').click()
        cy.get('h1').contains('Welcome')
    })
    it('has an adaptive navigation bar', () => {
        cy.visit('/')
        cy.get('div[data-cy=popout-menu-container]').should('not.exist')
        cy.viewport('iphone-6')
        cy.get('div[data-cy=popout-menu-container]').should('not.exist')
        cy.get('button[data-cy=popout-menu-button]').click()
        cy.get('div[data-cy=popout-menu-container]').should('be.visible')
        cy.get('button[data-cy=popout-menu-button]').click()
        cy.get('div[data-cy=popout-menu-container]').should('not.exist')
    })
    // search page
    it('contains correct search fields', () => {
        cy.visit('/search')
        // test for defaults
        cy.get('input[name=query]')
            .should('be.visible')
            .invoke('attr','placeholder')
            .should('contain','Key word or phrase')
        cy.get('input[name=twitter]')
            .should('be.visible')
            .should('not.be.checked')
        cy.get('input[name=reddit]')
            .should('be.visible')
            .should('not.be.checked')
        cy.get('input[name=youtube]')
            .should('be.visible')
            .should('not.be.checked')
        cy.get('input[name=startDate]')
            .should('be.visible')
            .invoke('val')
            .should('be.empty')
        cy.get('input[name=startDate]')
            .should('be.visible')
            .invoke('val')
            .should('be.empty')
        cy.get('input[name=maxResults]')
            .should('be.visible')
        cy.contains('Launch Search')
    })
    it('can search individual platforms successfully', () => {
        testSearchSinglePlatform('reddit')
        testSearchSinglePlatform('youtube')
        testSearchSinglePlatform('twitter')
    })
    it('can search all platforms together successfully', () => {
        cy.visit('/search')
        cy.get('input[name=query]').type('bellevue')
        cy.get('input[name=twitter]').check()
        cy.get('input[name=reddit]').check()
        cy.get('input[name=youtube]').check()
        cy.get('input[name=maxResults]').type('3')
        cy.contains('Launch Search').click()
        cy.location('pathname', {timeout: 12000}).should('include','results')
        cy.contains('Graph').click()
    })
    // results page
    it('has working result displays', () => {
        cy.intercept('GET', '/api/*', {fixture: 'large_results.json'}).as('resultsIntercept')
        cy.visit('/search')
        cy.get('input[name=query]').type('bellevue college')
        cy.get('input[name=twitter]').check()
        cy.get('input[name=reddit]').check()
        cy.get('input[name=youtube]').check()
        cy.get('input[name=maxResults]').type('1')  // placeholder; wont effect stubbing
        cy.contains('Launch Search').click()
        cy.location('pathname', {timeout: 12000}).should('include','results')
        cy.get('div[data-cy=sort-button-container] button').eq(0).click()
        cy.get('div[data-cy=sort-button-container] button').eq(1).click()
        cy.get('div[data-cy=description-text-container]').should('not.be.visible')
        cy.get('button[data-cy=description-toggle-button]').eq(2).click()
        cy.get('div[data-cy=description-text-container]').should('be.visible')
        cy.get('div[data-cy=sort-button-container] button').eq(2).click()
        cy.get('div[data-cy=sort-button-container] button').eq(5).click()
        cy.get('div[data-cy=sort-button-container] button').eq(1).click()
        cy.get('div[data-cy=description-text-container]').should('be.visible')
        cy.get('button[data-cy=description-toggle-button]').eq(2).click()
        cy.get('div[data-cy=description-text-container]').should('not.be.visible')
        cy.contains('Graph').click()
        cy.get('div[data-cy=select-menu-selection]').eq(0).click()  // graph
        cy.get('div:visible[data-cy=select-menu-option]').eq(2).click()  // sentiment
        cy.get('div[data-cy=select-menu-selection]').eq(1).click() // over
        cy.get('div:visible[data-cy=select-menu-option]').eq(0).click() // all
        cy.get('div[data-cy=select-menu-selection]').eq(2).click() // group by
        cy.get('div:visible[data-cy=select-menu-option]').eq(0).click()  // score
        cy.wait(1000)
        cy.get('path.arc').eq(1)
            .trigger('mouseover')
            .then(() => {
                cy.wait(100)
                cy.get('.pie-legend').should('have.css' ,'opacity', '1')
            })
        cy.get('path.arc').eq(1)
            .trigger('mouseout')
            .then(() => {
                cy.wait(100)
                cy.get('.pie-legend').should('have.css' ,'opacity', '0')
            })
    })
})

// helper functions

function testSearchSinglePlatform(platformName) {
        cy.visit('/search')
        cy.get('input[name=query]').type('bellevue')
        cy.get('input[name=' + platformName + ']').check()
        cy.get('input[name=maxResults]').type('1')
        cy.contains('Launch Search').click()
        cy.location('pathname', {timeout: 10000}).should('include','results')
        cy.contains('Graph').click()   
}