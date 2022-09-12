describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://www.bing.com/')
    cy.screenshot('my-image')
  })
})
