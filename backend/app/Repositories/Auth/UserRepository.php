<?php

namespace App\Repositories\Auth;

use App\Models\User;
use App\DTOs\Auth\RegisterUserDTO;

class UserRepository {
  public function create(RegisterUserDTO $dto): User {
    return User::create([
      'name' => $dto->name,
      'email' => $dto->email,
      'password' => $dto->password,
    ]);
  }

  public function findByEmail(string $email): ?User {
    return User::where('email', $email)->first();
  }
}