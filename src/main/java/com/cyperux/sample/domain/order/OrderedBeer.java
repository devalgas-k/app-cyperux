package com.cyperux.sample.domain.order;

import com.cyperux.sample.domain.Amount;
import com.cyperux.sample.domain.BeerId;
import com.cyperux.shared.error.domain.Assert;

public record OrderedBeer(BeerId beer, Amount unitPrice) {
  public OrderedBeer {
    Assert.notNull("beer", beer);
    Assert.notNull("unitPrice", unitPrice);
  }
}
