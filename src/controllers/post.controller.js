import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 전체 게시글 조회
export const getPosts = async (req, res) => {
  const posts = await prisma.communityPost.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(posts);
};

// 게시글 상세 조회
export const getPostById = async (req, res) => {
  const post = await prisma.communityPost.findUnique({
    where: { id: Number(req.params.id) },
    include: { user: true, comments: true },
  });
  if (!post) return res.status(404).json({ message: "게시글 없음" });
  res.json(post);
};

// 게시글 작성
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId;
  const newPost = await prisma.communityPost.create({
    data: { title, content, userId },
  });
  res.status(201).json(newPost);
};

// 게시글 수정
export const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId;
  const postId = Number(req.params.id);

  const post = await prisma.communityPost.findUnique({ where: { id: postId } });
  if (!post || post.userId !== userId) {
    return res.status(403).json({ message: "수정 권한 없음" });
  }

  const updated = await prisma.communityPost.update({
    where: { id: postId },
    data: { title, content },
  });
  res.json(updated);
};

// 게시글 삭제
export const deletePost = async (req, res) => {
  const userId = req.user.userId;
  const postId = Number(req.params.id);

  const post = await prisma.communityPost.findUnique({ where: { id: postId } });
  if (!post || post.userId !== userId) {
    return res.status(403).json({ message: "삭제 권한 없음" });
  }

  await prisma.post.delete({ where: { id: postId } });
  res.json({ message: "삭제 완료" });
};

// 댓글 작성
export const createComment = async (req, res) => {
  const { content } = req.body;
  const postId = Number(req.params.id);
  const userId = req.user.userId;

  const comment = await prisma.postComment.create({
    data: { content, postId, userId },
  });
  res.status(201).json(comment);
};

// 댓글 조회
export const getComments = async (req, res) => {
  const postId = Number(req.params.id);
  const comments = await prisma.postComment.findMany({
    where: { postId },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });
  res.json(comments);
};
