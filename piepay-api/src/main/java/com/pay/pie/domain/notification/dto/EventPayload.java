package com.pay.pie.domain.notification.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record EventPayload(@JsonProperty("memberId") Long memberId,
						   @JsonProperty("referenceId") Long referenceId,
						   @JsonProperty("message") String message) {
}
