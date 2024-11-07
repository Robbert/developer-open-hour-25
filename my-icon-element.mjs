customElements.define(
  "my-icon",
  class MyIcon extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: "closed" });

      const style = this.ownerDocument.createElement("style");
      style.textContent = `
          svg {
              color: currentColor;
              pointer-events: none;
              width: var(--my-icon-size, auto);
              height: var(--my-icon-size, auto);
          }
        `;
      shadowRoot.appendChild(style);

      const src = this.getAttribute("src");
      const url = import.meta.resolve(src);

      fetch(url).then((response) => {
        response.text().then((svg) => {
          const span = this.ownerDocument.createElement("span");
          span.insertAdjacentHTML("beforeend", svg);
          shadowRoot.appendChild(span);
        });
      });
    }
  }
);
