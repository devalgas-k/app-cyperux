package com.cyperux.account.domain;

import java.util.Optional;

public interface AccountsRepository {
  Optional<Account> authenticatedUserAccount();
}
