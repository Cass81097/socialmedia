const relationships = [
    {
        "user1": {
            "id": 53,
            "username": "hoanganh"
        },
        "user2": {
            "id": 55,
            "username": "quynh"
        }
    },
    {
        "user1": {
            "id": 65,
            "username": "nhudao"
        },
        "user2": {
            "id": 53,
            "username": "hoanganh"
        }
    },
    {
        "user1": {
            "id": 54,
            "username": "nhuanh"
        },
        "user2": {
            "id": 53,
            "username": "hoanganh"
        }
    }
];

const findSharedUserIds = (relationships) => {
    const sharedUserIds = [];
  
    for (let i = 0; i < relationships.length; i++) {
      const relationship = relationships[i];
      const { user1, user2 } = relationship;
  
      // Kiểm tra sự tồn tại của user1.id trong các phần tử còn lại
      if (relationships.some((rel, index) => index !== i && (rel.user1.id === user1.id || rel.user2.id === user1.id))) {
        sharedUserIds.push(user1.id);
      }
  
      // Kiểm tra sự tồn tại của user2.id trong các phần tử còn lại
      if (relationships.some((rel, index) => index !== i && (rel.user1.id === user2.id || rel.user2.id === user2.id))) {
        sharedUserIds.push(user2.id);
      }
    }
  
    return sharedUserIds;
  };
  
  const sharedUserIds = findSharedUserIds(relationships);
  console.log(sharedUserIds);