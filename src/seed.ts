import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Post } from './entity/Post';
import { User } from './entity/User';
import { Comment } from './entity/Comment';

createConnection()
  .then(async (connection) => {
    const { manager } = connection;
    const u1 = new User();
    u1.username = 'xsnowholy';
    u1.passwordDigest = 'xxx';
    await manager.save(u1);
    const p1 = new Post();
    p1.title = 'Post 1';
    p1.content = '我的第一篇博客'
    p1.author = u1;
    await manager.save(p1);

    const c1 = new Comment();
    c1.user = u1;
    c1.post = p1;
    c1.content = '一条评论'
    await manager.save(c1)

    console.log({ u1ID: u1.id, p1ID: p1.id });

    connection.close();
  })
  .catch((error) => console.log(error));
