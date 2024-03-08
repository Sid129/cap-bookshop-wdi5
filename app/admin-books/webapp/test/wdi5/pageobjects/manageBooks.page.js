module.exports = {
  iClickOnCreateNewBook: async () => {
    await browser.asControl({
    	selector: {
            id: "books::BooksList--fe::table::Books::LineItem::StandardAction::Create",
            interaction: {
                    idSuffix: "BDI-content"
            }
      }
    }).press();
  },
  theBookListContains: async (sBook) => {
    const text = await browser.asControl({
    	selector: {
            controlType: "sap.m.Text",
            viewId: "books::BooksList",
            properties: {
                    text: sBook
            }
    }}).getText();
    expect(text).toEqual(sBook);
  }
}