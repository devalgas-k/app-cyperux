package com.cyperux.account.domain;

import static com.cyperux.shared.useridentity.domain.UsersIdentitiesFixture.*;

import java.util.List;
import com.cyperux.shared.authentication.domain.Role;

public final class AccountsFixture {

  private AccountsFixture() {}

  public static Account account() {
    return Account.builder()
      .username(username())
      .firstname(firstname())
      .lastname(lastname())
      .email(email())
      .roles(List.of(Role.ADMIN.key()))
      .build();
  }
}
