import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostRepository } from "./repositorys/post.repository";

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) { }

  async create(createPostDto: CreatePostDto) {
    const findPost = await this.postRepository.findByTitle(createPostDto.userId, createPostDto.title);

    if (findPost) {
      throw new ConflictException("Você já criou um post com esse título");
    }

    const newPost = await this.postRepository.create(createPostDto);

    return newPost;
  }

  async findAll() {
    const posts = await this.postRepository.findAll();

    return posts;
  }

  async findOne(id: string) {
    const findPost = await this.postRepository.findOne(id);

    if (!findPost) {
      throw new NotFoundException("Não foi possível encontrar um post com esse id");
    }

    return findPost;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const findPost = await this.postRepository.findOne(id);

    if (!findPost) {
      throw new NotFoundException("Não foi possível encontrar um post com esse id");
    }

    const updatedPost = await this.postRepository.update(id, updatePostDto);

    return updatedPost;
  }

  async remove(id: string) {
    const findPost = await this.postRepository.findOne(id);

    if (!findPost) {
      throw new NotFoundException("Não foi possível encontrar um post com esse id");
    }

    return await this.postRepository.remove(id);
  }
}
