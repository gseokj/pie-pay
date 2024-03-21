package com.pay.pie.global.security.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SecurityUserDto {
	private Long memberId;
	private String email;
	private String nickname;
	private String picture;
	private String role;
	private Integer memberNo;
}
