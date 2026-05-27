package com.cyperux.shared.pagination.infrastructure.primary;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import java.util.List;
import java.util.function.Function;
import com.cyperux.shared.error.domain.Assert;
import com.cyperux.shared.pagination.domain.CyperuxPage;

@Schema(name = "Page", description = "Paginated content")
public final class RestCyperuxPage<T> {

  private final List<T> content;
  private final int currentPage;
  private final int pageSize;
  private final long totalElementsCount;
  private final int pagesCount;
  private final boolean hasPrevious;
  private final boolean hasNext;

  private RestCyperuxPage(RestCyperuxPageBuilder<T> builder) {
    content = builder.content;
    currentPage = builder.currentPage;
    pageSize = builder.pageSize;
    totalElementsCount = builder.totalElementsCount;
    pagesCount = builder.pageCount;
    hasPrevious = builder.hasPrevious;
    hasNext = builder.hasNext;
  }

  public static <S, T> RestCyperuxPage<T> from(CyperuxPage<S> source, Function<S, T> mapper) {
    Assert.notNull("source", source);
    Assert.notNull("mapper", mapper);

    return new RestCyperuxPageBuilder<>(source.content().stream().map(mapper).toList())
      .currentPage(source.currentPage())
      .pageSize(source.pageSize())
      .totalElementsCount(source.totalElementsCount())
      .pageCount(source.pageCount())
      .hasPrevious(source.hasPrevious())
      .hasNext(source.hasNext())
      .build();
  }

  @Schema(description = "Page content")
  public List<T> getContent() {
    return content;
  }

  @Schema(description = "Current page (starts at 0)", example = "0", requiredMode = RequiredMode.REQUIRED)
  public int getCurrentPage() {
    return currentPage;
  }

  @Schema(description = "Number of elements on each page", example = "10", requiredMode = RequiredMode.REQUIRED)
  public int getPageSize() {
    return pageSize;
  }

  @Schema(description = "Total number of elements to paginate", example = "100", requiredMode = RequiredMode.REQUIRED)
  public long getTotalElementsCount() {
    return totalElementsCount;
  }

  @Schema(description = "Number of resulting pages", example = "10", requiredMode = RequiredMode.REQUIRED)
  public int getPagesCount() {
    return pagesCount;
  }

  @Schema(description = "True is there is a previous page, false otherwise", requiredMode = RequiredMode.REQUIRED)
  public boolean getHasPrevious() {
    return hasPrevious;
  }

  @Schema(description = "True is there is a next page, false otherwise", requiredMode = RequiredMode.REQUIRED)
  public boolean getHasNext() {
    return hasNext;
  }

  private static final class RestCyperuxPageBuilder<T> {

    private final List<T> content;
    private int currentPage;
    private int pageSize;
    private long totalElementsCount;
    private int pageCount;
    private boolean hasPrevious;
    private boolean hasNext;

    private RestCyperuxPageBuilder(List<T> content) {
      this.content = content;
    }

    public RestCyperuxPageBuilder<T> pageSize(int pageSize) {
      this.pageSize = pageSize;

      return this;
    }

    public RestCyperuxPageBuilder<T> currentPage(int currentPage) {
      this.currentPage = currentPage;

      return this;
    }

    public RestCyperuxPageBuilder<T> totalElementsCount(long totalElementsCount) {
      this.totalElementsCount = totalElementsCount;

      return this;
    }

    public RestCyperuxPageBuilder<T> pageCount(int pageCount) {
      this.pageCount = pageCount;

      return this;
    }

    public RestCyperuxPageBuilder<T> hasPrevious(boolean hasPrevious) {
      this.hasPrevious = hasPrevious;

      return this;
    }

    public RestCyperuxPageBuilder<T> hasNext(boolean hasNext) {
      this.hasNext = hasNext;

      return this;
    }

    public RestCyperuxPage<T> build() {
      return new RestCyperuxPage<>(this);
    }
  }
}
