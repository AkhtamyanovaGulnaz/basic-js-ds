const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(value) {
    this.currentRoot = value ? new Node(value) : null;
    this.count = 0;
  }

  root() {
    return this.currentRoot;
  }

  add(data) {
    this.count++;
    
    let newNode = new Node(data);

    if (this.count === 1 && !this.currentRoot) {
      this.currentRoot = newNode;
    }

    const searchTree = node => {
      if (data < node.data) {
        if (!node.left) {
          node.left = newNode;
        } else {
          searchTree(node.left);
        }
      }
      else if (data > node.data) {
        if (!node.right) {
          node.right = newNode;
        } else {
          searchTree(node.right);
        }
      }
    }
    
    searchTree(this.currentRoot);
  }

  has(data) {
    let currentNode = this.currentRoot;

    while (currentNode) {
      if (currentNode.data === data) {
        return true;
      }
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      };
    }

    return false;
  }

  find(data) {
    let currentNode = this.currentRoot;

    while (currentNode) {
      if (currentNode.data === data) {
        return currentNode;
      }
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      };
    }

    return null;
  }

  remove(data) {
    this.currentRoot = removeNode(this.currentRoot, data);

    function removeNode(node, data){
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
      }

      if (!node.left) {
        node = node.right;
        return node;
      }
      if (!node.right) {
        node = node.left;
        return node;
      }

      let minFromRight = node.right;
      while (minFromRight.left) {
        minFromRight = minFromRight.left;
      }
      node.data = minFromRight.data;

      node.right = removeNode(node.right, minFromRight.data);

      return node;
    }
  }

  min() {
    if (!this.currentRoot) {
      return null;
    }

    let currentPointer = this.currentRoot;
    while (currentPointer.left) {
      currentPointer = currentPointer.left;
    }

    return currentPointer.data;
  }

  max() {
    if (!this.currentRoot) {
      return null;
    }

    let currentPointer = this.currentRoot;

    while (currentPointer.right) {
      currentPointer = currentPointer.right;
    }

    return currentPointer.data;
  }
}

module.exports = {
  BinarySearchTree
};