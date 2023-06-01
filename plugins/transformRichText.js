
/**
 * Function to transform the Rich Text field from a Blok to HTML
 * returns HTML string
 * @returns {string | null }
 */

export default ({ app }, inject) => {
  inject('transformRichText', (richTextObject) => {
    let html = ''

    richTextObject?.content?.forEach((item) => {
      if (item.type === 'paragraph') {
        let paragraph = '<p>'

        item?.content?.forEach((content) => {
          let text = content.text

          if (content.marks) {
            content.marks.forEach((mark) => {
              switch (mark.type) {
                case 'bold':
                  text = `<strong>${text}</strong>`
                  break
                case 'italic':
                  text = `<em>${text}</em>`
                  break
                case 'link':
                  text = `<a href="${mark.attrs.href}" target="${mark.attrs.target}">${text}</a>`
                  break
                default:
                  break
              }
            })
          }

          paragraph += `${text} `
        })

        paragraph += '</p>'
        html += paragraph
      }
    })

    return html
  })
}
