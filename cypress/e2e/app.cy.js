describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
    
    // Find a link with an href attribute containing "/posts" and click it
    cy.get('a[href*="/posts"]').click()

    
    // Find a link to create a new post and click it
    cy.get('a[href*="/posts/manage/new"]').click()

    // Go back to the posts page
    cy.visit('http://localhost:3000/posts')

    // Click on a specific post link
    cy.get('a[href*="/posts"]').eq(1).click()

    cy.visit('http://localhost:3000/dashboard')
    cy.visit('http://localhost:3000/users')

  })
})
