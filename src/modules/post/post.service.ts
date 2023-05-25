import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostRepository } from "./repositories/post.repository";
import jwt_decode from "jwt-decode";
import { IDataDecode } from "src/interfaces/decode";

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) { }

  async create(createPostDto: CreatePostDto, userToken: string) {
    const decode: IDataDecode = jwt_decode(userToken);

    const newPost = await this.postRepository.create(decode.sub, createPostDto);

    return newPost;
  }

  async findAll() {
    const posts = await this.postRepository.findAll();

    return posts;
  }

  async findOne(id: string) {
    const findPost = await this.postRepository.findOne(id);

    return findPost;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const updatedPost = await this.postRepository.update(id, updatePostDto);

    return updatedPost;
  }

  async remove(id: string) {
    return await this.postRepository.remove(id);
  }
}
