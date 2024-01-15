function Alert(message: string = '', level = 'info') {
  return `<div id="message" class="container" style="z-index: 999 !important">
  <div
    class="alert alert-${level} text-center"
    role="alert"
    id="alert"
  >
    ${message}
  </div>
</div>`;
}

export default Alert;
