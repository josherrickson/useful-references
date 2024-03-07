/***********************************************************************
   Index filter
************************************************************************/

// Get user-input
const filterInput = document.getElementById('filterInput')

// Get list of all topics
const citationList = document.querySelectorAll('.citation_entry')

// Add an event listener to the input
filterInput.addEventListener('input', highlightOccurrences)

function highlightOccurrences() {
  citationList.forEach((x) => {
    const toReplace = filterInput.value.trim()

    // First remove any existing highlighting
    const regexRemoveHighlight = /<span class="highlight">([^<]*)<\/span>/g
    x.innerHTML = x.innerHTML.replace(regexRemoveHighlight, '$1')

    // If the user has input anything
    if (toReplace.length !== 0) {
      const htmlString = x.innerHTML.match(/<[^>]*>|[^<]+/g)

      const newString = htmlString.map((s) => {
        // Add span if not currently a tag
        if (s.charAt(0) !== '<' ) {
          // 'g' means match all; 'i' means ignore case
          let regex = new RegExp(`(${toReplace})`, 'gi')
          return s.replaceAll(regex,
            '<span class="highlight">$1</span>')
        } else {
          // Return tags directly.
          return s
        }
      })

      x.innerHTML = newString.join('')
    }
  })
}


// Add an event listener to the input
filterInput.addEventListener('input', filterList)

function filterList() {
  const toReplace = filterInput.value.trim()

  // Short-circuit if no input
  if (toReplace.length === 0) {
    citationList.forEach((sl) => {
      sl.style.display = ''
    })
    return
  }

  citationList.forEach((sl) => {
    // Check if the list item contains the user input, if not hide it
    const toReplaceRegex = new RegExp(`${toReplace}`, 'i')
    if (toReplaceRegex.test(sl.textContent)) {
      // Matches, so keep it
      sl.style.display = ''
    } else {
      // Doesn't match, hide it.
      sl.style.display = 'none'
    }
  })
}

const resetButton = document.getElementById('resetButton')

resetButton.addEventListener('click', () => {
  filterInput.value = ''
  // After emptying, force highlighting and filter-ing to re-run to unhighlight
  // and unfilter everything.
  filterList()
  highlightOccurrences()
})
