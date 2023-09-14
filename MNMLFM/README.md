This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

<!-- Todo List -->

[x] React Navigation
[x] Welcome Screen
[x] Login Screen
[ ] Register Screen
[ ] Home Screen - Recently visited
[x] Product Screen
[x] Category Screen
[x] Cart Screen
[x] User Screen
[ ] Filtering ( from yt )

[x] Mail OTP auth
[x] resend OTP
[ ] forgot password

<!-- api endpoints  -->
<!-- products  -->

GET /api/products
GET /api/products/productId
GET /api/products/top
GET /api/billboards

POST /api/products/productId
POST /api/product

PUT /api/products/productId -> to update product(qty,all)
DELETE /api/products/productId

<!-- color and size  -->

POST create size,color
GET when creating product list all available size and colour.

<!-- users  -->

POST /api/users/userId
GET /api/users/userId
DELETE /api/users/userId

GET /api/users

 <!-- Models  -->
 <!-- user model -->

\_id : string
imageURL : string (firebase storage)
name : string
email : string
password : string

<!-- product model -->

\_id : string
images : arr
name : string
desc: string
qty: string
isAvalable : boolean
rating : arr
review : arr
colors : arr

<!-- rating model  -->

\_id : string
userId : string
productId : string
rating : float

<!-- review model -->

\_id : string
userId : string
productId : string
comment : string

<!-- colors model  -->

\_id : string
code : string

<!-- colors model  -->

\_id : string
size : string

<!-- Orders model -->

\_id : string
date: string
isPaid : boolean
name : userId.name
phone : string
state: string
isDispatch: boolean
isDelivered: boolean
track : arr[address]
productId : string
productSize: string
productColor: string
qty: number

<!-- address model  -->

\_id : string
street : string
city : string
zipcode: number

<!-- DASHBOARD  -->

[ ] Overview
[ ] BillBoards ( titles nd images )
[ ] Sizes
[ ] Colours
[ ] Products ( search products)
[ ] Orders
[ ] Settings
