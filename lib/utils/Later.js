const Later = (callback) => setTimeout(requestAnimationFrame(callback), 0);

export default Later
