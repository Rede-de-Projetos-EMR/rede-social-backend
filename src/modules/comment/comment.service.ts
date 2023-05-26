import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentRepository } from "./repositories/comment.repository";
import { tokenToId } from "src/utils/tokenToId";

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async create(createCommentDto: CreateCommentDto, userToken: string) {
    const decode: string = tokenToId(userToken);

    const newComment = await this.commentRepository.create(decode, createCommentDto);

    return newComment;
  }

  async findAll() {
    return await this.commentRepository.findAll();
  }

  async findOne(id: string) {
    const findComment = await this.commentRepository.findOne(id);

    if(!findComment){
      throw new NotFoundException("Comentário não encontrado!");
    }

    return findComment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const updatePost = await this.commentRepository.update(id, updateCommentDto);

    return updatePost;
  }

  async remove(id: string) {
    return await this.commentRepository.remove(id);
  }
}
