import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Post } from './entity/Post';

createConnection()
  .then(async (connection) => {
    const posts = await connection.manager.find(Post);

    if(posts.length === 0) {
      await connection.manager.save([1,2,3,4,5,6,7,8,9,10,11].map(n => {
        return new Post({ title: `Post ${n}`, content: `第 ${n} 篇文章` })
      }));
      const posts2 = await connection.manager.find(Post);
      console.log('posts 数据填充完了');
    }
    
    connection.close();
  })
  .catch((error) => console.log(error));