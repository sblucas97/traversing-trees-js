class QueueNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new QueueNode(value);
    
    if(this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }

    this.size += 1;
  }

  dequeue() {
    if(this.size === 0) return false;

    const removedNode = this.first;
    const newFirst = this.first.next;

    if(!newFirst) {
      this.last = null;
    }

    this.first = newFirst;
    removedNode.next = null;

    this.size--;

    return removedNode;
  }

  print() {
    if(this.size === 0) return false;

    let node = this.first;
    do {
      console.log(node.value);
      node = node.next;
    } while(node);
  }
}

class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

class Tree {
  constructor() {
    this.root = null;
  }
  
  bfs() {
    if(!this.root) return false;
    
    const queue = new Queue();
    let treeValues = []
    queue.enqueue(this.root);
    
    while(queue.size !== 0) {
      const children = queue.first.value;

      if(children.children.length > 0) {
				children.children.forEach(item => queue.enqueue(item));
      }
      
  		treeValues.push(children.value);
      queue.dequeue();
    }
  	
    return treeValues;
  }
  
  dfs(type) {
    if(!this.root) return false;
    
    let treeValues = [];
    let current = this.root;
    
    const preOrder = (current) => {
      treeValues.push(current.value);
      if(current.children) {
        current.children.forEach(item => preOrder(item));
      }
    }
    
    const postOrder = (current) => {
      if(current.children) {
        current.children.forEach(item => postOrder(item));
      }
      treeValues.push(current.value);
    }
    
    const inOrder = (current) => {
      if(current.children.length !== 0) {
        const half = Math.floor(current.children.length / 2);

        for(let i = 0; i < half; i++) {
          inOrder(current.children[i]);
        }  
      }
      
      treeValues.push(current.value);
      
      if(current.children.length !== 0) {
        const half = Math.floor(current.children.length / 2);

        for(let i = half; i < current.children.length; i++) {
          inOrder(current.children[i]);
        }  
      }
      
    }
    
    switch(type) {
      default:
      case 'preOrder':
    		preOrder(current);
        break;
      
      case 'postOrder':
        postOrder(current);
        break;
    
      case 'inOrder': 
        inOrder(current);
        break;
    }
    
    return treeValues;
  }
}

const testTree2 = new Tree();
testTree2.root = new TreeNode(10);
testTree2.root.children.push(new TreeNode(6));
testTree2.root.children.push(new TreeNode(15));
testTree2.root.children[0].children.push(new TreeNode(3));
testTree2.root.children[0].children.push(new TreeNode(8));
testTree2.root.children[0].children.push(new TreeNode(7));
testTree2.root.children[1].children.push(new TreeNode(20));

const x = testTree2.dfs();