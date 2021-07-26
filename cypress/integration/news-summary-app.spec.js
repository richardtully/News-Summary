describe('News Summary App', function() {
	it('Shows a heading', function() {
		cy.visit('/')
		cy.get('#title-heading').should('contain', 'News Summary App')
	})

	it('grabs the main headlines from the guardian', () => {
		cy.intercept('https://content.guardianapis.com/search*', {fixture: 'SearchGeneral.json'})
		cy.visit('/')
		cy.get('#news-item-0').should('contain','Olympics 2020 day two: Kiesenhofer’s road race glory, tennis and gymnastics – live!')

	})

	it ('displays images for each headline', () => {
		cy.intercept('https://content.guardianapis.com/search*', {fixture: 'SearchGeneral.json'})
		cy.visit('/')
		cy.get('#news-thumbnail-0').should('have.attr', 'src', 'https://media.guim.co.uk/a4daf8d59aa783defa3c4c67916a8865474e88de/53_210_3346_2007/500.jpg')

	})

	it('can show the full article if i click on a div', () => {
		cy.intercept('https://content.guardianapis.com/search*', {fixture: 'SearchGeneral.json'})
		cy.visit('/')
		cy.get('#news-thumbnail-0').click()
		cy.get('#news-text-0').should('contain', 'test news story that is suitably short')

	})



})