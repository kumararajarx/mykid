export default function() {
  return [
    {
      title: 'Dashboard',
      to: '/blog-overview',
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ''
    },
    {
      title: 'Schedule Class',
      htmlBefore: '<i class="material-icons">error</i>',
      to: '/schedule-class'
    },
    {
      title: 'Classes',
      htmlBefore: '<i class="material-icons">error</i>',
      to: '/classes'
    },
    {
      title: 'Centers',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/centers'
    },
    {
      title: 'Students',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/students'
    },
    {
      title: 'Volunteers',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/volunteers'
    },
    {
      title: 'Examination',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/tests'
    },
    {
      title: 'Blog Posts',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: '/blog-posts'
    },
    {
      title: 'Add New Post',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/add-new-post'
    },
    {
      title: 'Forms & Components',
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: '/components-overview'
    },
    {
      title: 'User Profile',
      htmlBefore: '<i class="material-icons">person</i>',
      to: '/user-profile-lite'
    },
    {
      title: 'Errors',
      htmlBefore: '<i class="material-icons">error</i>',
      to: '/errors'
    }
  ];
}
