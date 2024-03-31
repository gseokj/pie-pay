package com.pay.pie.domain.notification.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record EventPayload(@JsonProperty("memberId") String memberId) {
}
