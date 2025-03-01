/**
 * Write your challenge solution here
 */

//elements
const accordionItemBtns = Array.from(
  document.querySelectorAll(".accordion-button")
);
const accordionItems = Array.from(document.querySelectorAll(".accordion-item"));

//functions
const offAccordions = (exceptIndex) => {
  accordionItems.forEach((accordionItem, index) => {
    if (index !== exceptIndex) {
      accordionItem.classList.remove("active");
    }
  });
};

const toggleAccordings = () => {};

//events
accordionItemBtns.forEach((accordionItemBtn, index) => {
  accordionItemBtn.addEventListener("click", () => {
    //open toggle  content of clicked accordion
    const accordionItem = accordionItemBtn.parentElement;

    //remove active of all accordions except the current one being clicked
    offAccordions(accordionItems.indexOf(accordionItem));
    accordionItem.classList.toggle("active");
  });
});
