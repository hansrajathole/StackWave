// export function formatDate(dateString) {
//   const date = new Date(dateString);
//   const now = new Date();
//   const diffTime = Math.abs(now - date);
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
//   if (diffDays < 1) {
//     const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
//     if (diffHours < 1) {
//       const diffMinutes = Math.floor(diffTime / (1000 * 60));
//       if (diffMinutes < 1) {
//         return 'Just now';
//       }
//       return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
//     }
//     return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
//   }
  
//   if (diffDays < 7) {
//     return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
//   }
  
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   });
// }


// export function formatNumber(num) {
//   if (num >= 1000000) {
//     return (num / 1000000).toFixed(1) + 'M';
//   }
//   if (num >= 1000) {
//     return (num / 1000).toFixed(1) + 'K';
//   }
//   return num.toString();
// }


// export function getReputationLevel(reputation) {
//   if (reputation >= 20000) return 'Trusted';
//   if (reputation >= 10000) return 'Established';
//   if (reputation >= 5000) return 'Advanced';
//   if (reputation >= 1000) return 'Intermediate';
//   if (reputation >= 100) return 'Beginner';
//   return 'Newcomer';
// }