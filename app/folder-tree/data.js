export const treeData = [
  {
    id: 1,
    name: 'public',
    children: [{ id: 2, name: 'favicon.ico' }]
  },
  {
    id: 3,
    name: 'src',
    children: [
      {
        id: 4,
        name: 'components',
        children: [
          { id: 5, name: 'icons', children: [
            { id: 6, name: 'plus.jsx'},
            { id: 7, name: 'minus.jsx'},
          ]},
          { id: 8, name: 'Header.jsx' },
          { id: 9, name: 'Sidebar.jsx' }
        ]
      },
      { id: 10, name: 'App.jsx' }
    ]
  },
]
