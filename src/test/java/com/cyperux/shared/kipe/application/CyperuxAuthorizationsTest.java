package com.cyperux.shared.kipe.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;
import static com.cyperux.shared.kipe.application.TestAuthentications.*;
import static com.cyperux.shared.kipe.domain.RolesAccessesFixture.*;

import java.util.List;
import java.util.stream.Stream;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import com.cyperux.UnitTest;
import com.cyperux.shared.authentication.application.UnknownAuthenticationException;
import com.cyperux.shared.authentication.domain.Username;
import com.cyperux.shared.error.domain.MissingMandatoryValueException;

@UnitTest
class CyperuxAuthorizationsTest {

  private static final CyperuxAuthorizations authorizations = new CyperuxAuthorizations(
    List.of(rolesAccesses())
  );

  @Nested
  class AllAuthorized {

    @Test
    void shouldNotBeAuthorizedWithoutAuthentication() {
      assertThat(authorizations.allAuthorized(null, "read", TestResource.USERS)).isFalse();
    }

    @Test
    void shouldNotBeAuthorizedWithoutAction() {
      assertThat(authorizations.allAuthorized(admin(), null, TestResource.USERS)).isFalse();
    }

    @Test
    void shouldNotBeAuthorizedWithBlankAction() {
      assertThat(authorizations.allAuthorized(admin(), " ", TestResource.USERS)).isFalse();
    }

    @Test
    void shouldNotBeAuthorizedWithoutResourceAction() {
      assertThat(authorizations.allAuthorized(admin(), "read", null)).isFalse();
    }

    @Test
    void shouldNotBeAuthorizedForNotAuthorizedAction() {
      assertThat(authorizations.allAuthorized(admin(), "not-authorized", TestResource.USERS)).isFalse();
    }

    @Test
    void shouldBeAuthorizedForAuthorizedAction() {
      assertThat(authorizations.allAuthorized(admin(), "read", TestResource.USERS)).isTrue();
    }
  }

  @Nested
  class GetUsername {

    @Test
    void shouldNotGetNotAuthenticatedUserUsername() {
      assertThatThrownBy(() -> authorizations.getUsername(null)).isExactlyInstanceOf(MissingMandatoryValueException.class);
    }

    @ParameterizedTest
    @MethodSource("allValidAuthentications")
    void shouldGetAuthenticatedUserUsername(Authentication authentication) {
      assertThat(authorizations.getUsername(authentication)).isEqualTo(new Username("admin"));
    }

    @Test
    void shouldNotGetAuthenticatedUserUsernameForUnknownAuthentication() {
      assertThatThrownBy(() -> authorizations.getUsername(TestAuthentications.user(null))).isExactlyInstanceOf(
        UnknownAuthenticationException.class
      );
    }

    private static Stream<Arguments> allValidAuthentications() {
      return Stream.of(Arguments.of(createDummyAuthenticationWithPrincipalDetails("admin")), Arguments.of(TestAuthentications.admin()));
    }

    private static Authentication createDummyAuthenticationWithPrincipalDetails(String username) {
      var principalDetails = createUserDetailsWithUsername(username);
      Authentication authentication = mock(Authentication.class);
      when(authentication.getPrincipal()).thenReturn(principalDetails);
      when(authentication.toString()).thenReturn("Authentication with userDetails, username=" + username);
      return authentication;
    }

    private static UserDetails createUserDetailsWithUsername(String username) {
      UserDetails adminUserDetails = mock(UserDetails.class);
      when(adminUserDetails.getUsername()).thenReturn(username);
      return adminUserDetails;
    }
  }

  @Nested
  class SpecificAuthorized {

    @Test
    void shouldNotBeAuthorizedWithoutAuthentication() {
      assertThat(authorizations.specificAuthorized(null, "read", TestResource.USERS)).isFalse();
    }

    @Test
    void shouldNotBeAuthorizedWithoutAction() {
      assertThat(authorizations.specificAuthorized(user(), null, TestResource.USERS)).isFalse();
    }

    @Test
    void shouldNotBeAuthorizedWithBlankAction() {
      assertThat(authorizations.specificAuthorized(user(), " ", TestResource.USERS)).isFalse();
    }

    @Test
    void shouldNotBeAuthorizedWithoutResourceAction() {
      assertThat(authorizations.specificAuthorized(user(), "read", null)).isFalse();
    }

    @Test
    void shouldNotBeAuthorizedForNotAuthorizedAction() {
      assertThat(authorizations.specificAuthorized(user(), "not-authorized", TestResource.USERS)).isFalse();
    }

    @Test
    void shouldBeAuthorizedForAuthorizedAction() {
      assertThat(authorizations.specificAuthorized(user(), "read", TestResource.USERS)).isTrue();
    }
  }
}
