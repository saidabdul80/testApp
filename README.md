## Demo

[View Demo](https://test-app-wine-mu.vercel.app/posts)


## Getting Started

First, run the development server:

```bash

npm install
```
then
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##Testing

```bash
npm run build
#then
npm run start
#then
npm run cypress:open
```

To open Cypress for end-to-end testing, run:

# CustomModal Component

## Usage

### Props

- **children**: React Node
- **showModal**: Boolean
- **setShowModal**: Function
- **onConfirm**: Function

## Installation

Requires React and the `Button` component as dependencies.

## Example

```javascript
import { useState, useEffect, useRef } from 'react';
import Button from './Button';

const CustomModal = ({ children, showModal, setShowModal, onConfirm = () => {} }) => {
  // Component logic...
};

export default CustomModal;
```

### Props Example

```javascript
<CustomModal
  showModal={true}
  setShowModal={setShowModal}
  onConfirm={(confirmed) => {
    if (confirmed) {
      // Logic on confirmation
    }
  }}

  {/* Content to be displayed within the modal */}
</CustomModal>
```

## Contributing

Contributions are welcome through issues or pull requests.


