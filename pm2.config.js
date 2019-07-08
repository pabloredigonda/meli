module.exports = {
  apps : [
	  {
		  name      : 'Web',
		  cwd		: 'dist',
		  script    : 'index.js',
		  node_args : 'dotenv/config'
	  },
	  {
		    name      : 'Worker',
		    cwd       : 'dist',
		    script    : 'worker.js',
		    node_args : 'dotenv/config'
	  }
  ]
}