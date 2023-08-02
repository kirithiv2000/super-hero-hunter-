# Superhero App

## Features

### Home Page

- Fetch and display a list of SuperHeros (Characters) on the home page.
- Create a search bar to filter characters based on the search query.
- Example API: `https://gateway.marvel.com:443/v1/public/characters?ts=<time-stamp>&apikey=<public-key>&hash=<md5(ts+privateKey+publicKey)>`
- Search results should show superhero name and image.
- Each search result should have a "Favorite" button to add the superhero to "My favorite superheroes" list.
- Clicking on a search result opens a new page with more detailed information about the superhero (Superhero page).

### Superhero Page

- Show detailed information about the selected superhero.
- Display superhero name, photo, bio, and other information from the API (comics, events, series, stories, etc).

### My Favourite Superheroes Page

- Display a list of all favorite superheroes.
- The list should persist even after closing the browser.
- Each superhero in the list should have a "Remove from Favorites" button.
- Clicking on the "Remove from Favorites" button should remove the superhero from the list.

