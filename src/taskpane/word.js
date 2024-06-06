export default async function buildResponse(response) {
    Word.run(async (context) => {
        let body = context.document.body;

        var currentListLevel = 0
        var parsedMarkdown = response.split('\n').map(function (line) {
          if (line.startsWith('#')) {
            return { type: 'heading', level: line.indexOf('#') + 1, text: line.replace(/#/g, '').trim() };
          } else if (line.startsWith('-')) {
            var level = line.indexOf('-') / 2;
            return { type: 'list', level: level, text: line.replace(/-/g, '').trim() };
          } else {
            return { type: 'paragraph', text: line.trim() };
          }
        });

        parsedMarkdown.forEach(function (block) {
          if (block.type === 'heading') {
            var title = body.insertParagraph(block.text, Word.InsertLocation.end)
            title.font.set({
              name: "Calibri",
              size: 20
            });
  
          } else if (block.type === 'paragraph') {
            var paragraph = body.insertParagraph(block.text, Word.InsertLocation.end);
            paragraph.font.set({
              name: "Calibri",
              size: 12
            });
 
          } else if (block.type === 'list') {
            if (block.level > currentListLevel) {
              for (var i = 0; i < block.level - currentListLevel; i++) {
                body.insertParagraph('• ', Word.InsertLocation.end);
              }
            } else if (block.level < currentListLevel) {
              for (var i = 0; i < currentListLevel - block.level; i++) {
                body.insertParagraph('', Word.InsertLocation.end);
              }
            }
            body.insertText(block.text, Word.InsertLocation.end);
 
            currentListLevel = block.level;
          }
        });


        await context.sync();
      });
}