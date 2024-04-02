package com.usecase.modules.common.share

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlin.coroutines.CoroutineContext

open class CoroutineScopeUse: CoroutineScope {
    private val job = Job()

    override val coroutineContext: CoroutineContext
        get() = job

    fun cancel() {
        job.cancel()
    }
}

