function generateNonce() {
  return Math.floor(Math.random() * 10000000)
}

export { generateNonce }